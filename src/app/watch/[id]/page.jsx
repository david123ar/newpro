import React from "react";

const page = async ({ params }) => {
  const param = await params;
  const id = param.id;
  return <div>watch henpro {id}</div>;
};

export default page;
