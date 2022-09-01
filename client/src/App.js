import React, { useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import { Button, Input, Progress, Text, Tooltip } from "@chakra-ui/react";
import copy from "copy-to-clipboard";

function App() {
  const [link, setLink] = React.useState("");
  const [custom, setCustom] = React.useState("");
  const [data, setData] = React.useState({});
  const [state, setState] = useState(false);
  const [loader, setLoader] = useState(false);
  const formRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState(false);
    setLoader(true);

    if (custom.length > 0) {
      const payload = {
        url: link,
        custom: custom,
      };
      const res = await axios.post(
        "https://minebitly.herokuapp.com/api/url",
        payload
      );
      const data = res.data;
      setData({ ...data });
      formRef.current.reset();
      setLoader(false);
    } else {
      const payload = {
        url: link,
      };
      const res = await axios.post(
        "https://minebitly.herokuapp.com/api/url",
        payload
      );
      const data = res.data;
      setData({ ...data });
      formRef.current.reset();
      setLoader(false);
    }
  };

  const copyToClipboard = () => {
    copy(data.shortUrl);
    setState(true);
  };

  return (
    <>
      {loader ? <Progress size="sm" isIndeterminate /> : ""}

      <div className="App">
        <form action="" ref={formRef} onSubmit={handleSubmit}>
          <Input
            type="text"
            required
            placeholder="Website Url..."
            onChange={(e) => setLink(e.target.value)}
            size="md"
            style={{ width: "80%" }}
          />
          <Input
            type="text"
            size="md"
            placeholder="Custom String..."
            style={{ width: "80%" }}
            maxLength="5"
            onChange={(e) => setCustom(e.target.value)}
          />
          <Button type="submit" colorScheme="teal" variant="outline">
            Create Shortlink
          </Button>
        </form>
        <div>
          <div className="link">
            {Object.values(data).length > 0 ? (
              <Tooltip
                hasArrow
                label={state ? `Copied` : `Click to Copy url`}
                bg="red.600"
                closeDelay={500}
              >
                <Button onClick={copyToClipboard}>
                  <p href={data.shortUrl}>{data.shortUrl}</p>
                </Button>
              </Tooltip>
            ) : (
              <Button disabled="true">
                <p>Fill The Details First</p>
              </Button>
            )}
          </div>
          <div className="tt">
            <Text fontSize="xl">Here is your Link 👆</Text>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
