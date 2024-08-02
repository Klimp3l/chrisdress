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
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

import { useEffect, useState } from "react";
import { useToast } from "@/app/_components/ui/use-toast";
import { useSWRConfig } from "swr";

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
    pickers: Picker[] | []
}

const DialogColor = ({ color, pickers }: AlertItemProps) => {
    const { mutate } = useSWRConfig()
    const { toast } = useToast();

    const [girls, setGirls] = useState<Girl[] | null>([]);
    const [girl, setGirl] = useState<Girl | null>();
    const [open, setOpen] = useState(false);
    const [isPeding, setIsPeding] = useState(false);

    const handleChangeGirl = (girl: string) => {
        setGirl(JSON.parse(girl))
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (girl) {
            setIsPeding(true)
            const response = await 
                fetch("/api/picker", {
                    method: "POST",
                    body: JSON.stringify({ 
                        girlId: girl.id,
                        colorId: color.id
                    })
                })
                .then(res => res.json())
                .finally(() => setIsPeding(false))
            
            toast(response)
        }
        
        setOpen(false)
        mutate("/api/picker");
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
                    pickers?.length < 2 ? (
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
                                girls?.filter(x => !pickers?.find(y => y.girl.id == x.id))?.map((girl) => (
                                    <SelectItem key={girl.id} value={JSON.stringify(girl)}>{girl.name}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
                        </DialogClose>
                        <Button onClick={(e) => handleSubmit(e)} disabled={!girl || isPeding}>Escolher</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AlertDialogAction>
    );
};

export default DialogColor;
