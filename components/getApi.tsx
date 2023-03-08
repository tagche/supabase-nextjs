import { useState } from 'react'
import { supabase } from './dbConnect'
import { Database } from '../utils/database.types'

export type Categories = Database['public']['Tables']['categories']['Row'] | null
export type Products = Database['public']['Tables']['products']['Row'] | null

export async function getCategories(select: string = '"*"', eq?: string) {
    try {
        let { data, error } = await supabase
            .from('categories')
            .select(select)

        if (error && status !== 406) {
            throw error
        }
        if(data) return data
        
    } catch (error) {
        console.log(('Error loading Category data...'))
        console.log(error)
    }
}
export async function getProducts(
        select: string = '"*"', 
        eqName?: string,
        eqVal?: any
    ) {
    try {
        let { data, error } = await supabase
            .from('products')
            .select(select)  
            .eq(eqName, eqVal) 

        if (error && status !== 406) {
            throw error
        }
        if (data) return data
    } catch (error) {
        console.log(('Error loading products data!'))
        console.log(error)
    }
}
