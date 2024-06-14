export interface TherapyFormProps {
    onSubmit: (data: object) => void;
    backHandler?:() => void;
    nextHandler?:() => void;
    sliding?:number
    formData?:any;
    datachild?:any;
  }
  