
type ListProps = {
    name?: string
    id?: number
    href?: string
}

function List({ users }: { users: ListProps[] }) {
    if (users.length === 0) return <p>No users available!</p>

    return (
        <ul>
            {
                users.map((user, index) => (
                    <li key={index}>
                        <a href={user.href}>
                            {user.name}
                        </a>
                    </li>
                ))
            }
        </ul>
    )
}

export default List
