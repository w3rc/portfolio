import React, { Component } from 'react';

class Portfolio extends Component {
	render() {
		if (this.props.data) {
			var projects = this.props.data.projects.map(function (projects) {
				var projectImage = 'images/screenshots/' + projects.image;
				return (
					<div key={projects.title} className='columns portfolio-item'>
						<div
							style={{
								display: 'flex',
								flexFlow: 'column',
								alignItems: 'center',
							}}
						>
							<div style={{ backgroundColor: '#313131' }}>
								<img
									alt={projects.title}
									src={projectImage}
									style={{
										flex: 1,
										objectFit: 'contain',
									}}
								/>
								<div className='overlay'>
									<div className='portfolio-item-meta'>
										<h5>{projects.title}</h5>
										<p>{projects.description}</p>
									</div>
								</div>
							</div>
							<div style={{ marginTop: 20 }}></div>
							<a
								target='_blank'
								href={projects.deploy}
								style={{
									backgroundColor: '#515151',
									width: '100%',
									textAlign: 'center',
									textDecoration: 'none',
									color: 'white',
									fontSize: 18,
								}}
							>
								Demo
							</a>
							<div style={{ marginTop: 10 }}></div>
							<a
								target='_blank'
								href={projects.source}
								style={{
									backgroundColor: '#515151',
									width: '100%',
									textAlign: 'center',
									textDecoration: 'none',
									color: 'white',
									fontSize: 18,
								}}
							>
								Source Code
							</a>
						</div>
					</div>
				);
			});
		}

		return (
			<section id='portfolio'>
				<div className='row'>
					<div className='twelve columns collapsed'>
						<h1>Check Out Some of My Works.</h1>

						<div
							id='portfolio-wrapper'
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
							className='bgrid-quarters s-bgrid-thirds cf'
						>
							{projects}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Portfolio;
