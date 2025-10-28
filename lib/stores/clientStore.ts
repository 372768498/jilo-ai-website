import { create } from 'zustand'
import { Client } from '../types/client'

interface ClientStore {
  clients: Client[]
  selectedClient: Client | null
  loading: boolean
  setClients: (clients: Client[]) => void
  setSelectedClient: (client: Client | null) => void
  setLoading: (loading: boolean) => void
  addClient: (client: Client) => void
  updateClient: (id: string, updates: Partial<Client>) => void
  deleteClient: (id: string) => void
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  selectedClient: null,
  loading: false,
  
  setClients: (clients) => set({ clients }),
  setSelectedClient: (client) => set({ selectedClient: client }),
  setLoading: (loading) => set({ loading }),
  
  addClient: (client) => 
    set((state) => ({ clients: [...state.clients, client] })),
  
  updateClient: (id, updates) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...updates } : client
      ),
      selectedClient:
        state.selectedClient?.id === id
          ? { ...state.selectedClient, ...updates }
          : state.selectedClient,
    })),
  
  deleteClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
      selectedClient: state.selectedClient?.id === id ? null : state.selectedClient,
    })),
}))

