import { Link } from 'react-router-dom';

export default function Public() {
  return (
    <section className="text-start d-flex flex-column">
      <header className="my-5 px-2 px-md-5">
        <h1>
          Welcome to <span className="nowrap">Dan D. Repairs!</span>
        </h1>
      </header>
      <main
        className="d-flex flex-column justify-content-start px-2 px-md-5 align-items-start"
        style={{ minHeight: 'calc(100vh - 146px - 123px)' }}
      >
        <p>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <address className="my-4">
          Dan D. Repairs
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Dan Davidson</p>
      </main>
      <footer className="justify-self-end bg-light py-5 px-2 w-100">
        <Link to="/login" className="paragraph-2">
          Employee Login
        </Link>
      </footer>
    </section>
  );
}
