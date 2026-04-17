interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onRemove: (id: string) => void;
    onPlaceOrder: () => void;
}
export default function CartDrawer({ isOpen, onClose, items, onRemove, onPlaceOrder }: CartDrawerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CartDrawer.d.ts.map