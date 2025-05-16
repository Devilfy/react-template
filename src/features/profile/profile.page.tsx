import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const { id } = useParams();
    return <div>{id}</div>;
};

export const Component = ProfilePage;
