import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Client } from '@/types'

export function useClientById(id: string) {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClient() {
      setLoading(true)
      const docRef = doc(db, 'clients', id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setClient({ id: docSnap.id, ...docSnap.data() } as Client)
      } else {
        setClient(null)
      }
      setLoading(false)
    }

    fetchClient()
  }, [id])

  return { client, loading }
}
