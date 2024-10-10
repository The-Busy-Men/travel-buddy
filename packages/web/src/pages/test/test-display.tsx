import { useTestData } from "./hooks/useTestData"
import './components/table.css'
import WarningWrapper from "../components/wrappers/warningWrapper";

export const Test = () => {
    const {data, isLoading} = useTestData();
    
    if (isLoading) return (<div>Loading...</div>)
    return (
    <>
    <WarningWrapper message="This is a test page" state="warning">
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
    </WarningWrapper>
    </>
    )
}