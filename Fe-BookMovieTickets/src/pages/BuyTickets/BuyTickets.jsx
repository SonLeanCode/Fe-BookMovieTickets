import { useState } from "react";

const BuyTickets = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>123</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <p>You clicked {count} times</p>
        </div>
    );
}

export default BuyTickets;
