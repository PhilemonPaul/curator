import React, { createContext, useState, useContext } from 'react';
import { mockProjects, mockChecklist } from '../data/mockData';

// Deep clone the mockChecklist and attach it to every unit
const initialProjects = mockProjects.map(project => ({
  ...project,
  towers: project.towers ? project.towers.map(tower => ({
    ...tower,
    floors: tower.floors ? tower.floors.map(floor => ({
      ...floor,
      units: floor.units ? floor.units.map(unit => ({
        ...unit,
        checklist: JSON.parse(JSON.stringify(mockChecklist)),
      })) : []
    })) : []
  })) : []
}));

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(initialProjects);

  const updateUnitChecklist = (projectId, towerId, floorId, unitId, newChecklist) => {
    setProjects(prevProjects => prevProjects.map(project => {
      if (project.id !== projectId) return project;
      return {
        ...project,
        towers: project.towers.map(tower => {
          if (tower.id !== towerId) return tower;
          return {
            ...tower,
            floors: tower.floors.map(floor => {
              if (floor.id !== floorId) return floor;
              return {
                ...floor,
                units: floor.units.map(unit => {
                  if (unit.id !== unitId) return unit;
                  return {
                    ...unit,
                    checklist: newChecklist
                  };
                })
              };
            })
          };
        })
      };
    }));
  };

  return (
    <ProjectContext.Provider value={{ projects, updateUnitChecklist }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
