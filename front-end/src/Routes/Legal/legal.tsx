import LegalPaper from "../../Components/LegalShit/LegalPaper";
import LegalAtribution, { LegalAttributionProps } from "../../Components/LegalShit/LegalAtribution";

export default function Legal() {

  const attribution: LegalAttributionProps[] = []
  attribution.push({
    projectLink: "https://awot.net/",
    projectName: "aWOT",
    copyRightText: `aWOT, Express.js inspired microcontreller web framework for the Web of Things

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.`,
    key: "awot-license"
  });

  attribution.push({
    projectLink: "http://dunkels.com/adam/pt/",
    projectName: "Protothreads",
    copyRightText: unescape("Copyright%20%28c%29%202004-2005%2C%20Swedish%20Institute%20of%20Computer%20Science.%0AAll%20rights%20reserved.%0A%0ARedistribution%20and%20use%20in%20source%20and%20binary%20forms%2C%20with%20or%20without%0Amodification%2C%20are%20permitted%20provided%20that%20the%20following%20conditions%0Aare%20met%3A%0A1.%20Redistributions%20of%20source%20code%20must%20retain%20the%20above%20copyright%0Anotice%2C%20this%20list%20of%20conditions%20and%20the%20following%20disclaimer.%0A2.%20Redistributions%20in%20binary%20form%20must%20reproduce%20the%20above%20copyright%0Anotice%2C%20this%20list%20of%20conditions%20and%20the%20following%20disclaimer%20in%20the%0Adocumentation%20and/or%20other%20materials%20provided%20with%20the%20distribution.%0A3.%20Neither%20the%20name%20of%20the%20Institute%20nor%20the%20names%20of%20its%20contributors%0Amay%20be%20used%20to%20endorse%20or%20promote%20products%20derived%20from%20this%20software%0Awithout%20specific%20prior%20written%20permission.%0A%0ATHIS%20SOFTWARE%20IS%20PROVIDED%20BY%20THE%20INSTITUTE%20AND%20CONTRIBUTORS%20%60AS%20IS%27%20AND%0AANY%20EXPRESS%20OR%20IMPLIED%20WARRANTIES%2C%20INCLUDING%2C%20BUT%20NOT%20LIMITED%20TO%2C%20THE%0AIMPLIED%20WARRANTIES%20OF%20MERCHANTABILITY%20AND%20FITNESS%20FOR%20A%20PARTICULAR%20PURPOSE%0AARE%20DISCLAIMED.%20IN%20NO%20EVENT%20SHALL%20THE%20INSTITUTE%20OR%20CONTRIBUTORS%20BE%20LIABLE%0AFOR%20ANY%20DIRECT%2C%20INDIRECT%2C%20INCIDENTAL%2C%20SPECIAL%2C%20EXEMPLARY%2C%20OR%20CONSEQUENTIAL%0ADAMAGES%20%28INCLUDING%2C%20BUT%20NOT%20LIMITED%20TO%2C%20PROCUREMENT%20OF%20SUBSTITUTE%20GOODS%0AOR%20SERVICES%3B%20LOSS%20OF%20USE%2C%20DATA%2C%20OR%20PROFITS%3B%20OR%20BUSINESS%20INTERRUPTION%29%0AHOWEVER%20CAUSED%20AND%20ON%20ANY%20THEORY%20OF%20LIABILITY%2C%20WHETHER%20IN%20CONTRACT%2C%20STRICT%0ALIABILITY%2C%20OR%20TORT%20%28INCLUDING%20NEGLIGENCE%20OR%20OTHERWISE%29%20ARISING%20IN%20ANY%20WAY%0AOUT%20OF%20THE%20USE%20OF%20THIS%20SOFTWARE%2C%20EVEN%20IF%20ADVISED%20OF%20THE%20POSSIBILITY%20OF%0ASUCH%20DAMAGE.%0A%0AAuthor%3A%20Adam%20Dunkels"),
  })

  return (
    <LegalPaper>
      {attribution.map((val) => <LegalAtribution
        copyRightText={val.copyRightText}
        projectLink={val.projectLink}
        projectName={val.projectName}
        key={val.key}
      />)}
    </LegalPaper>
  )
}