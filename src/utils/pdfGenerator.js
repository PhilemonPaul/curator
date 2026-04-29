import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const generateProjectPDF = async (project, status) => {
  let htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; border-bottom: 2px solid #D97706; padding-bottom: 20px; margin-bottom: 30px; }
          .title { font-size: 28px; font-weight: bold; color: #111; margin: 0; }
          .subtitle { font-size: 16px; color: #666; margin-top: 8px; }
          .status { font-size: 18px; font-weight: bold; margin-top: 15px; display: inline-block; padding: 8px 16px; border-radius: 20px; }
          .status-completed { background-color: #10B981; color: white; }
          .status-progress { background-color: #F59E0B; color: white; }
          .section { margin-bottom: 30px; }
          .section-title { font-size: 20px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
          th { background-color: #f9fafb; font-weight: bold; color: #4b5563; }
          .text-right { text-align: right; }
          .footer { margin-top: 50px; font-size: 12px; color: #9ca3af; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">${project.name}</h1>
          <div class="subtitle">${project.location}</div>
          <div class="status ${status === 'Completed' ? 'status-completed' : 'status-progress'}">
            Status: ${status}
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Tower Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Structure / Tower</th>
                <th class="text-right">Total Units</th>
                <th class="text-right">Completed Units</th>
                <th class="text-right">Completion %</th>
              </tr>
            </thead>
            <tbody>
  `;

  let totalProjectUnits = 0;
  let totalProjectCompleted = 0;

  if (project.towers && project.towers.length > 0) {
    project.towers.forEach(tower => {
      let towerUnits = 0;
      let towerCompleted = 0;
      
      if (tower.floors) {
        tower.floors.forEach(floor => {
          if (floor.units) {
            floor.units.forEach(unit => {
              towerUnits++;
              totalProjectUnits++;
              
              const isUnitComplete = unit.checklist && unit.checklist.length > 0 && unit.checklist.every(c => c.passed === true);
              if (isUnitComplete) {
                towerCompleted++;
                totalProjectCompleted++;
              }
            });
          }
        });
      }

      const percentage = towerUnits > 0 ? Math.round((towerCompleted / towerUnits) * 100) : 0;

      htmlContent += `
        <tr>
          <td><strong>${tower.name}</strong></td>
          <td class="text-right">${towerUnits}</td>
          <td class="text-right">${towerCompleted}</td>
          <td class="text-right">${percentage}%</td>
        </tr>
      `;
    });
  } else {
    htmlContent += `
      <tr>
        <td colspan="4" style="text-align: center; padding: 20px;">No structures found.</td>
      </tr>
    `;
  }

  const overallPercentage = totalProjectUnits > 0 ? Math.round((totalProjectCompleted / totalProjectUnits) * 100) : 0;

  htmlContent += `
            </tbody>
          </table>
        </div>

        <div class="section">
          <h2 class="section-title">Overall Summary</h2>
          <table>
            <tr>
              <td><strong>Total Structures:</strong></td>
              <td class="text-right">${project.towers ? project.towers.length : 0}</td>
            </tr>
            <tr>
              <td><strong>Total Units Inspected:</strong></td>
              <td class="text-right">${totalProjectUnits}</td>
            </tr>
            <tr>
              <td><strong>Successfully Completed Units:</strong></td>
              <td class="text-right">${totalProjectCompleted}</td>
            </tr>
            <tr>
              <td><strong>Overall Completion Rate:</strong></td>
              <td class="text-right"><strong>${overallPercentage}%</strong></td>
            </tr>
          </table>
        </div>

        <div class="footer">
          Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}<br/>
          Curator QA/QC Inspection Application
        </div>
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  } catch (error) {
    console.error("Failed to generate or share PDF", error);
  }
};
