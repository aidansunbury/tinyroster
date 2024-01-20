import NavBar from "./NavBar";

export default function OrganizationViewLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavBar />
      {children}
    </section>
  );
}
