"use client"

import { Button } from "@/app/_components/ui/button";
import {
    Dialog,
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

interface Color {
    id: number;
    hex: string;
}

interface Girl {
    id: number;
    name: string;
}

interface AlertItemProps {
    color: Color | null;
}

const DialogColor = ({ color }: AlertItemProps) => {
    const [girls, setGirls] = useState<Girl[] | null>([]);

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
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full">Quero Esta!</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Wait a minute! Who are you? 🧐🤔</DialogTitle>
                        <DialogDescription>
                            Selecione o seu nome no campo abaixo, Obrigada!.
                        </DialogDescription>
                    </DialogHeader>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione seu nome" />
                        </SelectTrigger>
                        <SelectContent className="absolute max-h-44">
                            {
                                girls?.map((girl) => (
                                    <SelectItem key={girl.id} value={girl.name}>{girl.name}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <Button type="submit">Escolher</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AlertDialogAction>
    );
};

export default DialogColor;
