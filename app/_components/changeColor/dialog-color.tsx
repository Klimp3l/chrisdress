"use client"

import { Button } from "@/app/_components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/_components/ui/select";
import { upSertPicker } from "@/data/picker";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";

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
    color: Color ;
    pickers: Picker[]
}

const DialogColor = ({ color, pickers }: AlertItemProps) => {
    const router = useRouter();
    const { toast } = useToast();

    const [girls, setGirls] = useState<Girl[] | null>([]);
    const [girl, setGirl] = useState<Girl | null>();
    const [open, setOpen] = useState(false);

    const handleChangeGirl = (girl: string) => {
        setGirl(JSON.parse(girl))
        
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let response;

        if (girl) {
            response = await upSertPicker({ 
                girlId: girl.id,
                colorId: color.id
            })
        }
    
        setOpen(false)
        toast({
            title: response?.message
        })
        router.push("/");
    };

    useEffect(() => {
        const fetchGirls = async () => {
            const response = await fetch('/api/girl');
            const data = await response.json();
            
            setGirls(data);
        };

        if (!girls?.length) {
            fetchGirls();
        }

    }, [girls]);

    return (
        <AlertDialogAction onClick={(e) => e.preventDefault()}>
            <Dialog open={open}>
                {
                    pickers.length < 2 ? (
                        <DialogTrigger asChild>
                            <Button className="w-full" onClick={() => setOpen(true)}>Quero Esta!</Button>
                        </DialogTrigger>
                    ) : ''
                }
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Wait a minute! Who are you? 🧐🤔</DialogTitle>
                        <DialogDescription>
                            Selecione o seu nome no campo abaixo, Obrigada!.
                        </DialogDescription>
                    </DialogHeader>
                    <Select onValueChange={(girl) => handleChangeGirl(girl) }>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione seu nome" />
                        </SelectTrigger>
                        <SelectContent className="absolute max-h-44">
                            {
                                girls?.filter(x => !pickers.find(y => y.girl.id == x.id))?.map((girl) => (
                                    <SelectItem key={girl.id} value={JSON.stringify(girl)}>{girl.name}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
                        </DialogClose>
                        <Button onClick={(e) => handleSubmit(e)} disabled={!girl}>Escolher</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AlertDialogAction>
    );
};

export default DialogColor;
