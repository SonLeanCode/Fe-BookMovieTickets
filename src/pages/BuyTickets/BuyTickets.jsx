import Title from "../../components/BuyTickets/Title";

const BuyTickets = () => {
    const titleData = "Welcome to Buy Tickets Page";

    return (
        <div className="w-full m-20 text-black p-10">
            <Title titleName={titleData} />
        </div>
    );
}

export default BuyTickets;
