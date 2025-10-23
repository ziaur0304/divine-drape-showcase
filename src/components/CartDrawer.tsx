import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/product";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onProceedToOrder: () => void;
}

const CartDrawer = ({ isOpen, onClose, cartItems, onRemoveItem, onProceedToOrder }: CartDrawerProps) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] bg-gradient-card border-t-2 border-accent/20">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="font-display text-2xl text-primary">Your Cart</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-muted-foreground text-lg mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add some beautiful pieces to get started</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(80vh-200px)] py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-background rounded-lg border border-accent/10 animate-fade-in"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-28 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-display text-foreground mb-1">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                      <p className="text-primary font-bold">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-display text-foreground">Subtotal:</span>
                <span className="text-2xl font-bold text-primary">₹{subtotal}</span>
              </div>
              <Button
                onClick={onProceedToOrder}
                variant="luxury"
                size="lg"
                className="w-full"
              >
                Proceed to Order
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
