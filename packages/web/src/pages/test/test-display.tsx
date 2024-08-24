import { useTestData } from "./hooks/useTestData"
import './components/table.css'

export const Test = () => {
    const {data, isLoading} = useTestData();
    
    if (isLoading) return (<div>Loading...</div>)
    return (<>
    <div>
        <h1>This is some test data</h1>
    </div>
    <div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item: any) => (
                    <tr onClick={() => {alert(`You have clicked on Item No. ${item.id}`)}}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </>
    )
}