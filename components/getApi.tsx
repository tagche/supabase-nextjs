import { useState } from 'react'
import { supabase } from './dbConnect'
import { Database } from '../utils/database.types'
import { rejects } from 'assert'

export type Categories = Database['public']['Tables']['categories']['Row'] | null
export type Products = Database['public']['Tables']['products']['Row'] | null
export type Category_parent = Database['public']['Tables']['category_parent']['Row'] | null

export async function deleteProductApi(id){
    try {
        let { data, error } = await supabase
            .from('products')
            .delete()
            .match({ 'id': id })

        if (error) return error.message
        return false

    } catch (error) {
        return error.message
    }
}

export async function addProductApi(setData){
    try {
        let { data, error } = await supabase
            .from('products')
            .insert([setData])

        if (error) return error.message
        return false

    } catch (error) {
        return error.message
    }
}

export async function getAdminControlPanel(){
    try {
        let { data, error } = await supabase
            .from('products')
            .select('*')

        if (error && status !== 406) {
            throw error
        }
        return data
        
    } catch (error) {
        console.log(('Error loading Category data...'))
        console.log(error)
    }
}

export type slugsType = {
    slug: string
    ja: string
}

export async function getCategorySlug(){
    try {
        let { data, error } = await supabase
        .from('categories')
        .select('slug, ja')

        if (error && status !== 406) {
            throw error
        }

        //slugに相対する日本語カテゴリ名を成形して格納
        let simpleSlugs = {}
        Object.values(data).map((e) => {
            Object.assign(simpleSlugs, {[e.slug]: e.ja})
        })

        return simpleSlugs
        
    } catch (error) {
        console.log(('Error loading Category data...'))
        console.log(error)
    }
}

export async function getNav(){
    try {
        let { data, error } = await supabase
            .from('category_parent')
            .select('parent_slug, parent_ja, categories (*)')

        if (error && status !== 406) {
            throw error
        }
        return data
        
    } catch (error) {
        console.log(('Error loading Category data...'))
        console.log(error)
    }
}

export async function getCategories(route?: string){
    let target = '', slug = ''
    const result = getCategorySlug()
        .then((e) => {
            if(route && e[route]) target = 'slug', slug = route
        })
        .then(async() => {
            try {
                let { data, error } = await supabase
                .from('categories')
                .select('slug, ja, products (*)')
                .eq(target, slug)
        
                if (error && status !== 406) {
                    throw error
                }

                return data
        
            } catch (error) {
                console.log(('Error loading Category data...'))
                console.log(error)
            }
        })

        return result

}

