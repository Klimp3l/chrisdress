"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Separator } from '@/app/_components/ui/separator';
import DialogColor from "./dialog-color";
import { Badge } from "../ui/badge";
import useSWR from "swr";

interface Color {
  id: number;
  hex: string;
}

interface Girl {
  id: number;
  name: string;
}

interface Picker {
  girl: Girl;
  color: Color;
}

interface AlertItemProps {
  color: Color;
}

const fetcher = (url: string): Promise<Picker[] | []> => fetch(url).then(r => r.json())

const AlertColor = ({ color }: AlertItemProps) => {
  const { data } = useSWR("/api/picker", fetcher, { refreshInterval: 1000 })

  const pickers: Picker[] | [] = data ? data.filter(x => x.color.id == color.id) : []

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="relative pt-2">
          {
            pickers?.length ? (
              <Badge variant="destructive" className="absolute right-0 top-0">{pickers?.length}</Badge>
            ) : ''
          }
          <div className='flex flex-col gap-1 items-center justify-center'> 
            <div style={{ backgroundColor: color.hex }} className="w-10 h-10 rounded-full"/>
            <span className='text-xs'>{color.hex}</span>
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className='flex flex-col gap-1'>
              <div style={{ backgroundColor: color.hex }} className="h-40 w-full rounded-lg relative">
                <span className='absolute text-white left-2 top-2'>{color.hex}</span>
              </div>
              <Separator className="my-4" />
              <span>Oie 👋, deseja escolher cor esta para você?</span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className='flex flex-col gap-2'>
              <div>
                {pickers?.length}/2 madrinhas já escolheram esta cor.
              </div>
              <ul>
                {
                  pickers?.map((picker, index) => (
                    <li key={picker.girl.id}>
                      {picker.girl.name}
                    </li>
                  ))
                }
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Escolher outra</AlertDialogCancel>
          <DialogColor color={color} pickers={pickers}/>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertColor;
