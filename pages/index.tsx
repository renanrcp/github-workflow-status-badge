import { ChangeEvent, useRef, useState } from "react";
import FieldInput from "../components/FieldInput";

const Home = () => {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [workflowFile, setWorkflowFile] = useState('');
  const [branch, setBranch] = useState('');
  const [event, setEvent] = useState('');

  const [copySuccess, setCopySuccess] = useState<boolean | undefined>(undefined);

  const handleOwner = (e: ChangeEvent<HTMLInputElement>) => {
    setOwner(e.target.value);
  };
  const handleRepo = (e: ChangeEvent<HTMLInputElement>) => {
    setRepo(e.target.value);
  };
  const handleWorkflowFile = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkflowFile(e.target.value);
  };
  const handleBranch = (e: ChangeEvent<HTMLInputElement>) => {
    setBranch(e.target.value);
  };
  const handleEvent = (e: ChangeEvent<HTMLInputElement>) => {
    setEvent(e.target.value);
  };

  const svgUrl = (): string => {
    let url = `https://img.shields.io/endpoint?url=https://github-workflow-status-badge.vercel.app/api/${owner}/${repo}/${workflowFile}`;

    if (!!branch) {
      url += `?branch=${branch}`
    }

    if (!!event) {
      url += url.includes('?branch=') ? `&event=${event}` : `?event=${event}`;
    }

    return url;
  };

  const copyUrlToClipboard = () => {
    const url = svgUrl();

    if (!owner || !repo || !workflowFile) {
      setCopySuccess(false);
      return;
    }

    navigator.clipboard.writeText(url);
    setCopySuccess(true);
  };

  const getCopyStatusColor = () => {
    if (copySuccess === undefined) {
      return '';
    }

    if (copySuccess) {
      return '#008000'
    }

    return '#ff0000';
  };

  const getCopyStatusMessage = () => {
    if (copySuccess === undefined) {
      return '';
    }

    if (copySuccess) {
      return 'Copied successfully.';
    }

    return "Can't copy because any required field is missing.";
  };

  return (
    <div className='body-container'>
      <h1>Build Github Workflow Status Badge</h1>
      <div className="form-container">
        <FieldInput fieldName="owner" displayName="Owner*:" onChange={handleOwner} />
        <FieldInput fieldName="repo" displayName="Repo*:" onChange={handleRepo} />
        <FieldInput fieldName="workflowFile" displayName="WorkflowFile*:" onChange={handleWorkflowFile} />
        <FieldInput fieldName="branch" displayName="Branch:" onChange={handleBranch} />
        <FieldInput fieldName="event" displayName="Event:" onChange={handleEvent} />
        <p className="mb-8">Inputs with '*' is for required fields.</p>
      </div>
      <img className="pt-8 mb-8" src={svgUrl()} />
      <div className="button-container">
        <button className="copy-button" onClick={copyUrlToClipboard}>Copy URL</button>
        <span className="pt-8" style={{ color: getCopyStatusColor() }}>{getCopyStatusMessage()}</span>
      </div>
    </div>
  )
};

export default Home;
