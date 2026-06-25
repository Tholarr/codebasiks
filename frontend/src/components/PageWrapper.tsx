import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: Props) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}>
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
