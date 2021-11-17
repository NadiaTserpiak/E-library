import React, { useEffect, useState } from "react";
import Stack from "../sdk/entry";

export default function Header() {

const [header, setHeader] = useState({})
useEffect(async () => {
  const header = await Stack.getEntry("header", "en-us")
  setHeader(header[0][0])
}, []);
    return (
      <header>
        {header.title}
      </header>
    )
}
