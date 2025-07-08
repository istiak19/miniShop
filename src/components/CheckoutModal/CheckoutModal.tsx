import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Swal from 'sweetalert2';

interface CheckoutModalProps {
    open: boolean;
    onClose: () => void;
}

const CheckoutModal = ({ open, onClose }: CheckoutModalProps) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Swal.fire({
            position: "top",
            icon: "success",
            title: 'Order Placed!',
            text: `Thank you, ${form.name}! Your order has been successfully placed.`,
            showConfirmButton: false,
            timer: 1500
        });
        setForm({ name: "", email: "", address: "" });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md w-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Checkout</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-400 text-white cursor-pointer"
                    >
                        Place Order
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutModal;