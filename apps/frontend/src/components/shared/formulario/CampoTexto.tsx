
export interface CampoTextoProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChangeText?: (s: string) => void
}

export default function CampoTexto(props: CampoTextoProps) {

     return(

         <div className="flex input-form items-center bg-zinc-700 input-form">
            <input 
                type="text"
                value={props.value} 
                onChange={(e) => {
                    props.onChange?.(e) 
                    props.onChangeText?.(e.target.value)
                }} 
                placeholder={props.placeholder}
                className="flex-1 input-form"
            />
        </div>
    )
}