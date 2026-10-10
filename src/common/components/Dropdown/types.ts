export interface DropdownOption {
  label: string;
  value: number;
}

export interface DropdownProps {
  label?: string;
  placeholder: string;
  options: DropdownOption[];
  value?: number;
  onSelect: (value: number) => void;
}
