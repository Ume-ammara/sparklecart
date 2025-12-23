import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1>Dashboard page</h1>
      <div className="flex gap-2 ">
        <Link href={"/dashboard/user"}>User</Link>
        <Link href={"/dashboard/seller"}>Seller</Link>
      </div>
    </div>
  );
};

export default page;
