import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Homepage() {
  return (
    <div>
      <Header />
      <h1>Add task</h1>
    </div>
  );
}

export default Homepage;