function Comment({ content }) {
    return (
        <div className="container-fluid d-flex flex-column my-2 px-0 align-items-end">
            <div className="card d-flex flex-row flex-wrap w-100">
                <div className="d-flex flex-column w-100">
                    <div className="card-body d-flex flex-row justify-content-center align-items-center">
                        <img
                            src="images/person-circle.svg"
                            className="img-fluid mx-3"
                            alt=""
                        />
                        <p className="w-100 text-justify d-flex flex-wrap align-items-center my-1 mx-2">
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}