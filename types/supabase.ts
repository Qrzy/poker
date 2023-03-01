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
      pokerSessions: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
      }
      pokerUsers: {
        Row: {
          created_at: string
          id: number
          name: string
          uid: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          uid: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          uid?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
