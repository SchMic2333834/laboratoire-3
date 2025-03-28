function BlogList() {
    const [cards, setCards] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortBy, setSortBy] = React.useState("");

    React.useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await fetch('http://localhost:3000/cards');
            const cardsData = await response.json();
            setCards(cardsData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form className="container my-4 px-0">
                <div className="row g-3 align-items-center mx-auto">
                    <div className="col-12 col-md-6 order-1">
                        <input 
                            type="search" 
                            className="form-control" 
                            placeholder="Rechercher" 
                            aria-label="Search"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-12 col-md-6 order-2">
                        <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-2">
                            <span className="text-nowrap me-auto me-md-0">Trier par:</span>
                            <select 
                                className="form-select flex-shrink-1 w-50"
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="">Selectionner</option>
                                <option value="title">Nom</option>
                                <option value="date">Date</option>
                                <option value="author">Auteur</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
            <div className="container d-flex flex-wrap row-cols-1 row-cols-md-3">
                {cards.map(card => (
                    <BlogCard 
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        image={card.image}
                    />
                ))}
            </div>
        </div>
    );
}