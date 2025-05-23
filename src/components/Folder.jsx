// src/components/Folder.jsx
import DraggableItem from './DraggableItem';
import "../css/variables.css"
import "../css/base.css"
import "../css/components.css"
import "../css/Folder.css";
import folderIcon from '../assets/icons/Microsoft Windows 3 Applications.ico';

const Folder = (props) => (
  <DraggableItem
    {...props}
    defaultIcon={folderIcon}
    className="retro-folder"
  />
);

export default Folder;