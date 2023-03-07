import { useState } from 'react'
import { supabase } from './dbConnect'
import { Database } from '../../utils/database.types'


export async function getCategories() {
    try {
        let { data, error } = await supabase
            .from('categories')
            .select('*')
            console.log('categories: ' ,data)

        if (error && status !== 406) {
            throw error
        }
        if(data) return data
        
    } catch (error) {
        console.log(('Error loading Category data...'))
        console.log(error)
    }
}
export async function getProducts() {
    try {
        //setLoading(true)
        
        let { data, error } = await supabase
            .from('products')
            .select('*')
            console.log('products: ' ,data)

        if (error && status !== 406) {
            throw error
        }
        if (data) return data
    } catch (error) {
        console.log(('Error loading products data!'))
        console.log(error)
    } finally {
        //setLoading(false)
    }
}
