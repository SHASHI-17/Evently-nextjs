'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "../ui/textarea"
import {FileUploader} from "./FileUploader"
import { useState } from "react"
import Image from "next/image"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"

type EventFormProps={
    userId:string,
    type:'Create' | 'Update'
}


const EventForm = ({userId,type}:EventFormProps) => {

    const [files, setFiles] = useState<File[]>([]);

    const intialValues = eventDefaultValues;

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: intialValues,
      })
     

      function onSubmit(values: z.infer<typeof eventFormSchema>) {
        console.log(values);
      }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row ">

        <FormField control={form.control} name="title"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input placeholder="Event Title" {...field} className="input-field" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        <FormField control={form.control} name='categoryId'
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
            <Dropdown onChangeHandler={field.onChange} value={field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        </div>

        <div className="flex flex-col gap-5 md:flex-row">

        <FormField control={form.control} name='description'
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl className="h-72">
            <Textarea className="textarea rounded-2xl" placeholder="Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        <FormField control={form.control} name='imageUrl'
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl className="h-72">
           <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        </div>
        

        <div className="flex flex-col gap-5 md:flex-row">
        <FormField control={form.control} name='location'
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image src='/assets/icons/location-grey.svg' width={24}height={24} alt="location"/>
                <Input className="input-field" placeholder="Event location or Online" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
        <FormField control={form.control} name='startDateTime'
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image src='/assets/icons/calendar.svg' className=" filter-grey " width={24}height={24} alt="location"/>
                <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                <DatePicker wrapperClassName='datePicker' showTimeSelect timeInputLabel="Time:" dateFormat={'MM/dd/yyyy h:mm aa'}
                 selected={field.value} onChange={(date:Date) => field.onChange(date)} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        <FormField control={form.control} name='endDateTime'
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image src='/assets/icons/calendar.svg' className=" filter-grey " width={24}height={24} alt="location"/>
                <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                <DatePicker wrapperClassName='datePicker' showTimeSelect timeInputLabel="Time:" dateFormat={'MM/dd/yyyy h:mm aa'}
                 selected={field.value} onChange={(date:Date) => field.onChange(date)} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">

        <FormField control={form.control} name='price'
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image src='/assets/icons/dollar.svg' className=" filter-grey " width={24}height={24} alt="dollar"/>
                <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0
                focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"/>
                        <FormField control={form.control} name='isFree'
        render={({ field }) => (
          <FormItem >
            <FormControl>
              <div className="flex items-center">
               <label htmlFor="isFree" className=" whitespace-nowrap pr-3 leading-none 
               peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
              <Checkbox id='isFree' onCheckedChange={field.onChange} checked={field.value} className="mr-2 h-5 w-5 border-2 border-primary-500" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
              </div>
              
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

<FormField control={form.control} name='url'
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                <Image src='/assets/icons/link.svg' className=" filter-grey " width={24}height={24} alt="dollar"/>
                <Input type="string" placeholder="URl" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0
                focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"/>
              </div>
              
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        </div>


      <Button size='lg' disabled={form.formState.isSubmitting} className="button col-span-2 w-full"
       type="submit">{form.formState.isSubmitting ?'Submitting' :`${type} Event` }</Button>
    </form>
  </Form>
  )
}

export default EventForm