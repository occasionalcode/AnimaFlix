import { createFileRoute } from '@tanstack/react-router'
import AnimeInfo from './-AnimeInfo'

export const Route = createFileRoute('/anime-Info/$animeId/')({
  component: () => <AnimeInfoIndex />,
})

function AnimeInfoIndex() {
  const { animeId } = Route.useParams()
  return <AnimeInfo id={animeId} />
}
