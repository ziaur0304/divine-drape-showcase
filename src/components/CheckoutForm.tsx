import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CartItem } from "@/types/product";
import { toast } from "@/hooks/use-toast";

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSubmit: (data: { name: string; address: string; note: string }) => void;
}

const CheckoutForm = ({ isOpen, onClose, cartItems, onSubmit }: CheckoutFormProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !address.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your name and address",
        variant: "destructive"
      });
      return;
    }

    onSubmit({ name, address, note });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-card border-accent/20">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">
            Complete Your Order
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="bg-background border-accent/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground">
              Delivery Address <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your complete address"
              required
              rows={3}
              className="bg-background border-accent/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="text-foreground">
              Special Note (Optional)
            </Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any color, size, or customization preferences?"
              rows={2}
              className="bg-background border-accent/20"
            />
          </div>

          <div className="bg-background/50 p-4 rounded-lg border border-accent/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Items:</span>
              <span className="font-semibold text-foreground">{cartItems.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-display text-foreground">Total Amount:</span>
              <span className="text-xl font-bold text-primary">₹{subtotal}</span>
            </div>
          </div>

          <Button type="submit" variant="luxury" size="lg" className="w-full">
            Send Order via WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutForm;
