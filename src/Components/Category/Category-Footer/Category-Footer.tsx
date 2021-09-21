import './Category-Footer.css'

function CategoryFooter() {
  return (
    <div className="left-footer">
      <div className="sub-icon">
        <i className="fas fa-envelope leftfoot-icon"></i>
      </div>
      <div className="sub-icon">
        <i className="fas fa-calendar-alt leftfoot-icon"></i>
      </div>
      <div className="sub-icon">
        <i className="fas fa-id-badge leftfoot-icon"></i>
      </div>
      <div className="sub-icon">
        <i className="fas fa-upload leftfoot-icon"></i>
      </div>
      <div className="sub-icon">
        <i className="fas fa-check leftfoot-icon last-iconleft"></i>
      </div>
    </div>
  )
}

export default CategoryFooter;
