export interface AddModuleFormProps {
    onSubmit?: (data: object) => void;
    backHandler?:() => void;
    nextHandler?:() => void;
    sliding?:number
    formData?:any;
    Name?: string;
    Technology?: string;
    Email?: string;
    Version?: number;
  }
  