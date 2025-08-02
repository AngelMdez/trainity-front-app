import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function useClients() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      const snapshot = await getDocs(collection(db, "users"))
      const result = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setClients(result)
      setLoading(false)
    }

    fetchClients()
  }, [])

  return { clients, loading }
}