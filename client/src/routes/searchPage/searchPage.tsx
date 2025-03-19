import React from 'react'
import Gallery from '../../components/gallery/gallery'
import { useSearchParams } from 'react-router'

export default function SearchPage() {

  const [params] = useSearchParams()
  const search = params.get('search')
  const board_id = params.get('board_id')

  return <Gallery search={search} board_id={board_id}/>
}
