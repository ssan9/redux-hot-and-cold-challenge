import React from 'react';
import { connect } from 'react-redux'; 

export function AuralStatus(props) { //We require mapStateToProps function in stateless components
  return (
    <p
      id="status-readout"
      className="visuallyhidden"
      aria-live="assertive"
      aria-atomic="true"
    >
      {props.auralStatus}
    </p>
  );
}

const mapStateToProps = state => ({
  auralStatus: state.auralStatus
});

export default connect(mapStateToProps) (AuralStatus);