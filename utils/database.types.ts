export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      products: {
        Row: {
          category: string
          id: string
          ja: string
          slug?: string
          description?: string | null
          price: number | null
          updated_at?: string | null
        }
        Insert: {
          category?: string
          id?: string
          ja: string
          slug?: string
          description?: string | null
          price: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          id?: string
          ja: string
          slug?: string
          description?: string | null
          price: number | null
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          slug: string | null
          ja: string | null
        }
        Insert: {
          id: string
          slug?: string | null
          ja?: string | null
        }
        Update: {
          id?: string
          slug?: string | null
          ja?: string | null
        }
      }
      category_parent: {
        Row: {
          id: string
          parent_slug: string | null
          parent_ja: string | null
        }
        Insert: {
          id: string
          parent_slug?: string | null
          parent_ja?: string | null
        }
        Update: {
          id?: string
          parent_slug?: string | null
          parent_ja?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
