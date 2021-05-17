import React from "react";
// import ResponsiveModal from "react-responsive-modal";

const styles = {
  modal: {
    backgroundColor: "transparent",
    boxShadow: "none",
    display: "flex",
    overflow: "none",
    width: "100%",
    padding: "0",
    margin: "0",
    height: "100%",
    minWidth: "100%",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "#1cccc",
    padding: 0,
  },
  closeIcon: {
    fill: "#fff",
  },
};

const Search: React.FC = (props) => {
  //   const { setModalVisible, modalVisible } = props;
  return (
    <div>Hellp</div>
    // <ResponsiveModal
    //   open={modalVisible}
    //   onClose={() => setModalVisible(false)}
    //   styles={styles}
    //   animationDuration={1000}
    //   focusTrapped={true}
    // //   closeIconSize={40}
    //   showCloseIcon={true}
    // >

    // </ResponsiveModal>
  );
};

export default Search;
