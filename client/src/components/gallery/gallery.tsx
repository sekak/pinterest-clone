import GalleryItem from '@/components/galleryItem/galleryItem'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchPins } from '@/utils/fetch'
import { Props } from '@/components/gallery/types'
import Loading from '@/utils/loading'
import ErrorServer from '@/components/handleErr/ErrorServer'
import useStore from '@/utils/authStore'

export default function Gallery(props: Props) {

    const { currentUser } = useStore()

    let { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pins', props.search, props.userId, props.board_id, currentUser?._id],
        queryFn: ({ pageParam }) => fetchPins(pageParam, props.search, props.userId, props.board_id, currentUser?._id),
        initialPageParam: 0,
        getNextPageParam: (data) => data.nextCursor
    })

    if (status === "error") return <ErrorServer />
    if (status === "pending") return <Loading />

    const allPins = data?.pages.flatMap(page => page.pins) || []

    return (
        <InfiniteScroll
            dataLength={allPins.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Loading />}
            endMessage={
                <p className='text-center'>
                    <b>Yay! You have seen it all</b>
                </p>
            }>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-5 px-4'>
                {allPins?.map((item) => (
                    <GalleryItem key={item._id} {...item} />
                ))}
            </div>
        </InfiniteScroll>
    )
}
