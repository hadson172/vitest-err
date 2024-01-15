import './App.css'
import {FormProvider, useForm, useFormState} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {DevTool} from "@hookform/devtools";


const schema = z.object({
    first: z.object({
        date: z.string(),
    }),
    second: z.object({
        date: z.string(),
    })
}).refine(() => {
    console.log("Revalidate")
    return false;
}, {
    path: [],
    message: "ERRX"
})

type FormType = z.infer<typeof schema>

function App() {
    const form = useForm({
        reValidateMode: 'onBlur',
        mode: 'onTouched',
        defaultValues: {
            first: {
                date: null
            },
            second: {
                date: null
            }
        },
        resolver: zodResolver(schema)
    })


    console.log({isValid: form.formState.isValid})


    const  {register} = form

    return <form onSubmit={form.handleSubmit(() => {})}>
        <FormProvider {...form}>
            <input {...register('first.date')}/>
            <input {...register('second.date')}/>
            <Errors/>
            <DevTool control={form.control}/>
        </FormProvider>

        <button type={'submit'}>Submit</button>

        {JSON.stringify(    schema.safeParse({
            first: {
                date: "12312"
            },
            second: {
                date: "4532534"
            }
        }))}
    </form>

}

const Errors = () => {
    const {errors, isValid} = useFormState<FormType>()

    console.log({isValid, errors, x: errors?.root?.first, first: errors?.first?.root, root: errors.root})

    return null
}

export default App
