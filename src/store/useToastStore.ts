import create from "zustand";

interface ToastType {
  showToast: boolean;
  toastMessage: string;
  toastIcon: JSX.Element | React.FC | null;
}

interface ToastStore extends ToastType {
  setShowToast: (values: ToastType) => void;
}

export const defaultToastValues = {
  showToast: false,
  toastMessage: "",
  toastIcon: null,
};

const useToastStore = create<ToastStore>((set, get) => ({
  ...defaultToastValues,
  setShowToast: (values: ToastType) => set({ ...get(), ...values }),
}));

export default useToastStore;
