export interface SignupFormProps {
    onSubmit: (data: object) => void;
    backHandler?:() => void;
    nextHandler?:() => void;
    sliding?:number
    formData?:any;
  }
  