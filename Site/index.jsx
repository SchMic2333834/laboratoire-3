function App() {
    const [blogId, setBlogId] = React.useState(null);

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        setBlogId(id);
    }, []);

    return (
        <>
            <Header />
            {blogId ? <Blog /> : <BlogList />}
            <Footer />
        </>
    );
}


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
