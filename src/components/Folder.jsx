// src/components/Folder.jsx
import DraggableItem from './DraggableItem';
import "../css/variables.css"
import "../css/base.css"
import "../css/components.css"
import "../css/Icon.css";
import folderIcon from '../assets/icons/Microsoft Windows 3 Applications.ico';

const Folder = (props) => (
  <DraggableItem
    {...props}
    defaultIcon={folderIcon}
    className="retro-icon"
  />
);

export default Folder;